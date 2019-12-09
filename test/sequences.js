var assert = require("assert");
var FunctionTree = require("function-tree").FunctionTree;
var Devtools = require("function-tree/devtools").Devtools;
var moment = require('moment');
var { fetchOrders } = require('../nodejs/nodejs');
var  credentials = require('../credentials');

const devtools = new Devtools({
  host: "localhost:8590",
  reconnect: true,
  https: false
});

describe("WOOCOMMERCE SEQUENCES", function() {
  var FT = "Function Tree Awesome";

  this.beforeAll(() => {
    FT = new FunctionTree({});
    devtools.add(FT);
  });

  this.afterAll(() => {
    devtools.remove(FT);
  });

  describe("Woocommerce Order Fetch", function() {
    it("should fetch Orders", function(done) {
      FT.run(
        [
          fetchOrders,
          function resolveMocha(props) {
            console.log(props);
            done();
          }
        ],
        {
          credentials,
          url: 'https://artwalaz.com',
          startDate: moment().subtract(3, 'days').startOf('day').toISOString(),
          endDate: moment().toISOString()
        }
      ).catch(err => {
        console.log(err);
      });
    });
  });
});
