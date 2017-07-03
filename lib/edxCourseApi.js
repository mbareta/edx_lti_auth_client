const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config/main');

const jar = request.jar();
request.defaults({ jar });

class EdxCourseApi {
  getUserCourses(options) {
    options.url = `${config.lmsUrl}/api/courses/v1/courses/`;

    return request.getAsync(options)
    .then(response => JSON.parse(response.body))
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

  getUserCookies(req) {
    let csrf;

    for (const key in req.cookies) {
      const cookie = req.cookies[key];
      const cookieObject = request.cookie(`${key}=${cookie}`);

      jar.setCookie(cookieObject, config.lmsUrl);

      if (key === 'csrftoken') {
        csrf = cookie;
      }
    }

    return {
      headers: { 'X-CSRFToken': csrf },
      jar
    };
  }

  getAllUserBlocks(req) {
    const options = this.getUserCookies(req);

    return this.getUserCourses(options)
    // map and reduce execute all promises
    .map(course => this.getCourseLtiBlocks(course, options))
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
