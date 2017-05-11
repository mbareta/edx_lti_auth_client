const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config/main');

const jar = request.jar();
request.defaults({ jar });

class EdxCourseApi {

  static getUserCourses() {
    const coursesApiUrl = `http://localhost:8000/api/courses/v1/courses/`;
    return request.getAsync(coursesApiUrl)
    .then(response => {
      const results = JSON.parse(response.body).results;
      return results.map(({ blocks_url, id, name }) => ({ blocks_url, id, name }));
    })
  }

  static getCourseLtiBlocks({blocks_url}, options) {
    options.url = `${blocks_url}&all_blocks=true&depth=all&block_types_filter=lti&return_type=list&requested_fields=launch_url`;
    return request.getAsync(options)
  }

  static filterCcxCourses(course) {
    return course.id.indexOf('ccx') === 0;
  }

  static loginAuthenticatedUser(account, accessToken) {
    const options = {
      url: `${config.baseUrl}:${config.lmsPort}/oauth2/login/`,
      form: { access_token: accessToken }
    };

    return request.postAsync(options);
  }


  static getUserHttpOptions(user, accessToken) {
    return EdxCourseApi.loginAuthenticatedUser(user, accessToken)
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
   })
  }

  static getDisabledBlocks(user, accessToken) {
    return EdxCourseApi.getUserHttpOptions(user, accessToken)
    // prereqs are done, we are logged in and have all cookies and headers
    // send request we wanted to make
    .then(options => {
      this.options = options;
      return EdxCourseApi.getUserCourses()
    })
    .then(courses => courses
      // .filter(EdxCourseApi.filterCcxCourses)
      .map(course => EdxCourseApi.getCourseLtiBlocks(course, this.options))
    )
    .then(blocksPromises => Promise.all(blocksPromises))
    .then(blocks => blocks.reduce((a, b) => a.concat(JSON.parse(b.body)), []))
    // .then(blocks => {
    //   const masterCourseBlocks = blocks.filter(block => block.id.indexOf('ccx') === -1);
    //   const ccxCourseBlocks = blocks.filter(block => block.id.indexOf('ccx') === 0);

    //   return masterCourseBlocks
    //   .filter(masterCourseBlock => !!ccxCourseBlocks.filter(ccxCourseBlock => ccxCourseBlock.launch_url === masterCourseBlock.launch_url)
    //   );
    // })
  }
}


module.exports = EdxCourseApi;
