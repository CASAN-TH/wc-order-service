'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Order = mongoose.model('Order');

var credentials,
    token,
    mockup;

describe('Order CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,
            billing: {
                first_name: "John",
                last_name: "Doe",
                address_1: "969 Market",
                address_2: "",
                city: "San Francisco",
                state: "CA",
                postcode: "94103",
                country: "US",
                email: "john.doe@example.com",
                phone: "(555) 555-5555"
            },
            shipping: {
                first_name: "John",
                last_name: "Doe",
                address_1: "969 Market",
                address_2: "",
                city: "San Francisco",
                state: "CA",
                postcode: "94103",
                country: "US"
            },
            line_items: [
                {
                    product_id: 93,
                    quantity: 2
                },
                {
                    product_id: 22,
                    variation_id: 23,
                    quantity: 1
                }
            ],
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: 10
                }
            ]
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Order get use token', (done) => {
        request(app)
            .get('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Order get by id', function (done) {

        request(app)
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/orders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);

                        assert.equal(resp.data.payment_method, mockup.payment_method);
                        assert.equal(resp.data.payment_method_title, mockup.payment_method_title);
                        assert.equal(resp.data.set_paid, mockup.set_paid);


                        assert.equal(resp.data.billing.first_name, mockup.billing.first_name);
                        assert.equal(resp.data.billing.last_name, mockup.billing.last_name);
                        assert.equal(resp.data.billing.address_1, mockup.billing.address_1);
                        assert.equal(resp.data.billing.address_2, mockup.billing.address_2);
                        assert.equal(resp.data.billing.city, mockup.billing.city);
                        assert.equal(resp.data.billing.state, mockup.billing.state);
                        assert.equal(resp.data.billing.postcode, mockup.billing.postcode);
                        assert.equal(resp.data.billing.country, mockup.billing.country);

                        assert.equal(resp.data.shipping.first_name, mockup.shipping.first_name);
                        assert.equal(resp.data.shipping.last_name, mockup.shipping.last_name);
                        assert.equal(resp.data.shipping.address_1, mockup.shipping.address_1);
                        assert.equal(resp.data.shipping.address_2, mockup.shipping.address_2);
                        assert.equal(resp.data.shipping.city, mockup.shipping.city);
                        assert.equal(resp.data.shipping.state, mockup.shipping.state);
                        assert.equal(resp.data.shipping.postcode, mockup.shipping.postcode);
                        assert.equal(resp.data.shipping.country, mockup.shipping.country);


                        assert.equal(resp.data.line_items[0].product_id, mockup.line_items[0].product_id);
                        assert.equal(resp.data.line_items[0].quantity, mockup.line_items[0].quantity);
                        assert.equal(resp.data.line_items[1].product_id, mockup.line_items[1].product_id);
                        assert.equal(resp.data.line_items[1].variation_id, mockup.line_items[1].variation_id);
                        assert.equal(resp.data.line_items[1].quantity, mockup.line_items[1].quantity);


                        assert.equal(resp.data.shipping_lines[0].method_id, mockup.shipping_lines[0].method_id);
                        assert.equal(resp.data.shipping_lines[0].method_title, mockup.shipping_lines[0].method_title);
                        assert.equal(resp.data.shipping_lines[0].total, mockup.shipping_lines[0].total);



                        done();
                    });
            });

    });

    it('should be Order post use token', (done) => {
        request(app)
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.payment_method, mockup.payment_method);
                assert.equal(resp.data.payment_method_title, mockup.payment_method_title);
                assert.equal(resp.data.set_paid, mockup.set_paid);


                assert.equal(resp.data.billing.first_name, mockup.billing.first_name);
                assert.equal(resp.data.billing.last_name, mockup.billing.last_name);
                assert.equal(resp.data.billing.address_1, mockup.billing.address_1);
                assert.equal(resp.data.billing.address_2, mockup.billing.address_2);
                assert.equal(resp.data.billing.city, mockup.billing.city);
                assert.equal(resp.data.billing.state, mockup.billing.state);
                assert.equal(resp.data.billing.postcode, mockup.billing.postcode);
                assert.equal(resp.data.billing.country, mockup.billing.country);

                assert.equal(resp.data.shipping.first_name, mockup.shipping.first_name);
                assert.equal(resp.data.shipping.last_name, mockup.shipping.last_name);
                assert.equal(resp.data.shipping.address_1, mockup.shipping.address_1);
                assert.equal(resp.data.shipping.address_2, mockup.shipping.address_2);
                assert.equal(resp.data.shipping.city, mockup.shipping.city);
                assert.equal(resp.data.shipping.state, mockup.shipping.state);
                assert.equal(resp.data.shipping.postcode, mockup.shipping.postcode);
                assert.equal(resp.data.shipping.country, mockup.shipping.country);


                assert.equal(resp.data.line_items[0].product_id, mockup.line_items[0].product_id);
                assert.equal(resp.data.line_items[0].quantity, mockup.line_items[0].quantity);
                assert.equal(resp.data.line_items[1].product_id, mockup.line_items[1].product_id);
                assert.equal(resp.data.line_items[1].variation_id, mockup.line_items[1].variation_id);
                assert.equal(resp.data.line_items[1].quantity, mockup.line_items[1].quantity);


                assert.equal(resp.data.shipping_lines[0].method_id, mockup.shipping_lines[0].method_id);
                assert.equal(resp.data.shipping_lines[0].method_title, mockup.shipping_lines[0].method_title);
                assert.equal(resp.data.shipping_lines[0].total, mockup.shipping_lines[0].total);
                done();
            });
    });

    it('should be order put use token', function (done) {

        request(app)
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    payment_method: "bacs",
                    payment_method_title: "Direct Bank Transfer",
                    set_paid: true,
                    billing: {
                        first_name: "Johnn",
                        last_name: "Doe",
                        address_1: "969 Market",
                        address_2: "",
                        city: "San Francisco",
                        state: "CA",
                        postcode: "94103",
                        country: "US",
                        email: "john.doe@example.com",
                        phone: "(555) 555-5665"
                    },
                    shipping: {
                        first_name: "Johnn",
                        last_name: "Doe",
                        address_1: "969 Market",
                        address_2: "",
                        city: "San Francisco",
                        state: "CA",
                        postcode: "94203",
                        country: "US"
                    },
                    line_items: [
                        {
                            product_id: 92,
                            quantity: 1
                        },
                        {
                            product_id: 21,
                            variation_id: 24,
                            quantity: 2
                        }
                    ],
                    shipping_lines: [
                        {
                            method_id: "flat_rate",
                            method_title: "Flat Rate",
                            total: 10
                        }
                    ]
                }
                request(app)
                    .put('/api/orders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.payment_method, update.payment_method);
                        assert.equal(resp.data.payment_method_title, update.payment_method_title);
                        assert.equal(resp.data.set_paid, update.set_paid);


                        assert.equal(resp.data.billing.first_name, update.billing.first_name);
                        assert.equal(resp.data.billing.last_name, update.billing.last_name);
                        assert.equal(resp.data.billing.address_1, update.billing.address_1);
                        assert.equal(resp.data.billing.address_2, update.billing.address_2);
                        assert.equal(resp.data.billing.city, update.billing.city);
                        assert.equal(resp.data.billing.state, update.billing.state);
                        assert.equal(resp.data.billing.postcode, update.billing.postcode);
                        assert.equal(resp.data.billing.country, update.billing.country);

                        assert.equal(resp.data.shipping.first_name, update.shipping.first_name);
                        assert.equal(resp.data.shipping.last_name, update.shipping.last_name);
                        assert.equal(resp.data.shipping.address_1, update.shipping.address_1);
                        assert.equal(resp.data.shipping.address_2, update.shipping.address_2);
                        assert.equal(resp.data.shipping.city, update.shipping.city);
                        assert.equal(resp.data.shipping.state, update.shipping.state);
                        assert.equal(resp.data.shipping.postcode, update.shipping.postcode);
                        assert.equal(resp.data.shipping.country, update.shipping.country);


                        assert.equal(resp.data.line_items[0].product_id, update.line_items[0].product_id);
                        assert.equal(resp.data.line_items[0].quantity, update.line_items[0].quantity);
                        assert.equal(resp.data.line_items[1].product_id, update.line_items[1].product_id);
                        assert.equal(resp.data.line_items[1].variation_id, update.line_items[1].variation_id);
                        assert.equal(resp.data.line_items[1].quantity, update.line_items[1].quantity);


                        assert.equal(resp.data.shipping_lines[0].method_id, update.shipping_lines[0].method_id);
                        assert.equal(resp.data.shipping_lines[0].method_title, update.shipping_lines[0].method_title);
                        assert.equal(resp.data.shipping_lines[0].total, update.shipping_lines[0].total);
                        done();
                    });
            });

    });

    it('should be order delete use token', function (done) {

        request(app)
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/orders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be order get not use token', (done) => {
        request(app)
            .get('/api/orders')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be order post not use token', function (done) {

        request(app)
            .post('/api/orders')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be order put not use token', function (done) {

        request(app)
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/orders/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be order delete not use token', function (done) {

        request(app)
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/orders/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Order.remove().exec(done);
    });

});