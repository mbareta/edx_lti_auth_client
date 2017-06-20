const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config/main');

const jar = request.jar();
request.defaults({ jar });

class EdxCourseApi {
  getUserCourses() {
    const coursesApiUrl = `${config.lmsUrl}/api/courses/v1/courses/`;
    return request.getAsync(coursesApiUrl)
    .then(response => JSON.parse(response.body).results)
    .then(results => results.map(({ blocks_url, id, name }) => ({ blocks_url, id, name })));
  }

  getCourseLtiBlocks({ blocks_url }, options) {
    options.url = `${blocks_url}&all_blocks=true&depth=all&block_types_filter=lti,lti_consumer&return_type=list&requested_fields=launch_url`;
    return request.getAsync(options)
    .then(response => {
      return response.statusCode === 200 ? response : { body: JSON.stringify([]) };
    });
  }

  filterCcxCourses(course) {
    return course.id.indexOf('ccx') === 0;
  }

  loginAuthenticatedUser(account, accessToken) {
    const options = {
      url: `${config.lmsUrl}/oauth2/login/`,
      form: { access_token: accessToken }
    };

    return request.postAsync(options);
  }


  getUserHttpOptions(user, accessToken) {
    return this.loginAuthenticatedUser(user, accessToken)
    .then(response => {
      // set cookies and get CSRF Token
      const cookies = [];
      let csrf;
      response.headers['set-cookie'].forEach(cookie => {
        if (cookie.indexOf('csrf') >= 0) {
          csrf = cookie.split('csrftoken=')[1].split(';')[0];
        }
        jar.setCookie(cookie.replace(/"/g, ''), config.lmsUrl);
        cookies.push(cookie.replace(/"/g, ''));
      });

      return {
        headers: { 'X-CSRFToken': csrf },
        jar,
        cookies
      };
    });
  }

  getAllUserBlocks(session) {
    const { user, token: { access_token } } = session;

    return this.getUserHttpOptions(user, access_token)
    // prereqs are done, we are logged in and have all cookies and headers
    // send request we wanted to make
    .then(options => {
      this.options = options;
      session.edxCookies = options.cookies;

      return this.getUserCourses();
    })
    // map and reduce execute all promises
    .map(course => this.getCourseLtiBlocks(course, this.options))
    // flatten all blocks from all courses
    .reduce((a, b) => a.concat(JSON.parse(b.body)), []);
  }

  getDisabledBlocks(session) {
    return this.getAllUserBlocks(session)
    .then(blocks => {
      const masterCourseBlocks = blocks.filter(block => block.id.indexOf('ccx') === -1);
      const ccxCourseBlocks = blocks.filter(block => block.id.indexOf('ccx') === 0);
      const notInCcx = masterCourseBlock => !ccxCourseBlocks.find(ccxCourseBlock => ccxCourseBlock.launch_url === masterCourseBlock.launch_url);

      // return master course blocks which aren't present in CCX courses
      return masterCourseBlocks.filter(notInCcx);
    });
  }
}


module.exports = new EdxCourseApi();
