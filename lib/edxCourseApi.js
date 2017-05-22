const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config/main');

const jar = request.jar();
request.defaults({ jar });

class EdxCourseApi {

  getUserCourses() {
    const coursesApiUrl = `${config.baseUrl}:${config.lmsPort}/api/courses/v1/courses/`;
    return request.getAsync(coursesApiUrl)
    .then(response => JSON.parse(response.body).results)
    .then(results => results.map(({ blocks_url, id, name }) => ({ blocks_url, id, name })));
  }

  getCourseLtiBlocks({blocks_url}, options) {
    options.url = `${blocks_url}&all_blocks=true&depth=all&block_types_filter=lti&return_type=list&requested_fields=launch_url`;
    return request.getAsync(options);
  }

  filterCcxCourses(course) {
    return course.id.indexOf('ccx') === 0;
  }

  loginAuthenticatedUser(account, accessToken) {
    const options = {
      url: `${config.baseUrl}:${config.lmsPort}/oauth2/login/`,
      form: { access_token: accessToken }
    };

    return request.postAsync(options);
  }


  getUserHttpOptions(user, accessToken) {
    return this.loginAuthenticatedUser(user, accessToken)
    .then(response => {
      // set cookies and get CSRF Token
      let csrf;
      response.headers['set-cookie'].forEach(cookie => {
        if (cookie.indexOf('csrf') >= 0) {
          csrf = cookie.split('csrftoken=')[1].split(';')[0];
        }
        jar.setCookie(cookie.replace(/"/g, ''), `${config.baseUrl}:${config.lmsPort}/`);
      });

      return {
        headers: { 'X-CSRFToken': csrf },
        jar
      };
    });
  }

  getDisabledBlocks(user, accessToken) {
    return this.getUserHttpOptions(user, accessToken)
    // prereqs are done, we are logged in and have all cookies and headers
    // send request we wanted to make
    .then(options => {
      this.options = options;
      return this.getUserCourses();
    })
    .then(courses => courses
      .map(course => this.getCourseLtiBlocks(course, this.options))
    )
    .then(blocksPromises => Promise.all(blocksPromises))
    .then(blocks => blocks.reduce((a, b) => a.concat(JSON.parse(b.body)), []))
    .then(blocks => {
      const masterCourseBlocks = blocks.filter(block => block.id.indexOf('ccx') === -1);
      const ccxCourseBlocks = blocks.filter(block => block.id.indexOf('ccx') === 0);

      // return master course blocks which aren't present in CCX courses
      return masterCourseBlocks
      .filter(masterCourseBlock => !ccxCourseBlocks.find(ccxCourseBlock => ccxCourseBlock.launch_url === masterCourseBlock.launch_url)
      );
    });
  }
}


module.exports = new EdxCourseApi();
