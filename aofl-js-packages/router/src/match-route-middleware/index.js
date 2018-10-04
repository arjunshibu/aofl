import PathUtils from '../path-utils';

/**
 * Evaluates and returns the best matching route for the given path
 *
 * @summary match route middleware
 * @version 1.0.0
 * @author Arian Khosravi <arian.khosravi@aofl.com>
 * @param {String} _path
 * @param {Array} routes
 * @memberof module:aofl-js/router-package/src/match-route-middleware
 * @return {Object}
 */
const matchBestPath = (_path, routes) => {
  const path = PathUtils.removeTrailingSlash(PathUtils.cleanPath(_path));
  let stack = [];
  for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    route.path = PathUtils.removeTrailingSlash(PathUtils.cleanPath(route.path));
    if (path === route.path) { // exact match
      stack.shift();
      stack.push(route);
      break;
    }
    let matches = route.regex.exec(path);
    if (matches !== null) {
      if (stack.length === 0) {
        stack.push(route);
      } else {
        let pathSegments = PathUtils.getPathSegments(path);
        let routeSegments = PathUtils.getPathSegments(route.path);
        let lastSegments = PathUtils.getPathSegments(stack[0].path);
        let routeSegmentMatchesCount = PathUtils.matchingSegmentsCount(pathSegments, routeSegments);
        let lastSegmentMatchesCount = PathUtils.matchingSegmentsCount(pathSegments, lastSegments);
        if (routeSegmentMatchesCount > lastSegmentMatchesCount) {
          stack.shift();
          stack.push(route);
        }
      }
    }
  }
  let match = stack.shift();
  if (!match) return null;
  return Object.assign({}, match);
};


/**
 * Adds the match route before middleware logic
 *
 * @summary match route middleware
 * @version 1.0.0
 * @author Arian Khosravi <arian.khosravi@aofl.com>
 *
 * @param {Object} router
 * @return {Function}
 */
export default (router) => (request, response, next) => {
  let matchedRoute = matchBestPath(request.to, request.routes);
  if (matchedRoute !== null) {
    matchedRoute.props = matchedRoute.parse(request.to);
    router.matchedRoute = matchedRoute; // add MatchedRoute to the router instance
    next(Object.assign({}, response, {matchedRoute}));
  } else {
    next(Object.assign({}, response, {matchedRoute: null}));
  }
};
