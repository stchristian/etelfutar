const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

const createOrUpdateCartItemMW = require('../middlewares/shopping/createOrUpdateCartItem');

describe('Add MenuItem to cart', function() {
    it('Adding to an empty cart', function(done) {
        const models = {
            OrderItem: {
                findOne(options) {
                    expect(options.where.MenuItemId).to.equal(2);
                    expect(options.where.UserId).to.equal(1);
                    expect(options.where.OrderId).to.equal(null);
                    return Promise.resolve(null);
                },
                getCartTotalForUser() {
                    return Promise.resolve(0);
                },
                create(obj) {
                    expect(obj.MenuItemId).to.equal(2);
                    expect(obj.UserId).to.equal(1);
                    expect(obj.OrderId).to.equal(null);
                    expect(obj.Quantity).to.equal(1);
                    expect(obj.Price).to.equal(1000);
                    return Promise.resolve({});
                }
            }
        };
        const req = {
            user : {
                Id: 1
            },
            models,
            body : {
                quantity : 1
            },
            sequelize: {
                transaction() {
                    return Promise.resolve({
                        commit() {
                            expect(true).to.equal(true);
                        }
                    })
                }
            }
        };
        const res = { 
            locals: {
                menuItem : {
                    id: 2,
                    Price: 1000
                }
            } 
        };
        const next = () => {
            expect(res.locals.cartItem).to.not.equal(null);
            done();
        }

        process.env.MAX_CART_SIZE = 20000;
        createOrUpdateCartItemMW(req,res,next);

    });

    it('Updating an already existing cartItem', function(done) {
        const mockedCartItem = {
            Id: 1,
            Quantity: 1, 
            UserId: 1,
            MenuItemId: 2,
            OrderId: null,
            Price: 1000,
            update: chai.spy((opt) => {
                this.Quantity = opt.Quantity;
                this.Price = opt.Price;
                return Promise.resolve(this);
            })
        }

        const models = {
            OrderItem: {
                findOne(options) {
                    expect(options.where.MenuItemId).to.equal(2);
                    expect(options.where.UserId).to.equal(1);
                    expect(options.where.OrderId).to.equal(null);
                    return Promise.resolve(mockedCartItem);
                },
                getCartTotalForUser() {
                    return Promise.resolve(1000);
                },   
            }
        };
        const req = {
            user : {
                Id: 1
            },
            models,
            body : {
                quantity : 5
            },
            sequelize: {
                transaction() {
                    return Promise.resolve({
                        commit() {
                            expect(true).to.equal(true);
                        }
                    })
                }
            }
        };
        const res = { 
            locals: {
                menuItem : {
                    id: 2,
                    Price: 1000
                }
            } 
        };
        const next = () => {
            expect(mockedCartItem.update).to.have.been.called();
            done();
        }

        process.env.MAX_CART_SIZE = 20000;
        createOrUpdateCartItemMW(req,res,next);

    });
})