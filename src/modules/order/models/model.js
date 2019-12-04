'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Order name',
    // },

    parent_id: {
        type: Number
    },
    number: {
        type: String
    },
    order_key: {
        type: String
    },
    created_via: {
        type: String
    },
    version: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "processing", "on-hold", "completed", "cancelled", "refunded", "failed ", "trash"],
        default: "pending"
    },
    currency: {
        type: String,
        enum: ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "IRT", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PRB", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW"],
        default: "USD"
    },
    discount_total: {
        type: String
    },
    discount_tax: {
        type: String
    },
    shipping_total: {
        type: String
    },
    shipping_tax: {
        type: String
    },
    cart_tax: {
        type: String
    },
    total: {
        type: String
    },
    total_tax: {
        type: String
    },
    prices_include_tax: {
        type: String
    },
    customer_id: {
        type: Number
    },
    customer_ip_address: {
        type: String
    },
    customer_user_agent: {
        type: String
    },
    customer_note: {
        type: String
    },
    billing: {
        type: {
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            company: {
                type: String
            },
            address_1: {
                type: String
            },
            address_2: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            postcode: {
                type: String
            },
            country: {
                type: String
            },
            email: {
                type: String
            },
            phone: {
                type: String
            }
        }
    },
    shipping: {
        type: {
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            company: {
                type: String
            },
            address_1: {
                type: String
            },
            address_2: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            postcode: {
                type: String
            },
            country: {
                type: String
            }
        }
    },
    payment_method: {
        type: String
    },
    payment_method_title: {
        type: String
    },
    transaction_id: {
        type: String
    },
    cart_hash: {
        type: String
    },
    line_items: {
        type: [{
            id: {
                type: Number
            },
            name: {
                type: String
            },
            product_id: {
                type: Number
            },
            variation_id: {
                type: Number
            },
            quantity: {
                type: Number
            },
            tax_class: {
                type: String
            },
            subtotal: {
                type: String
            },
            subtotal_tax: {
                type: String
            },
            total: {
                type: String
            },
            total_tax: {
                type: String
            },
            taxes: {
                type: [
                    {
                        id: {
                            type: Number
                        },
                        rate_code: {
                            type: String
                        },
                        rate_id: {
                            type: String
                        },
                        label: {
                            type: String
                        },
                        compound: {
                            type: Boolean
                        },
                        tax_total: {
                            type: String
                        },
                        shipping_tax_total: {
                            type: String
                        },
                    }
                ]
            },
            sku: {
                type: String
            },
            price: {
                type: String
            }
        }]
    },
    tax_lines: {
        type: [{
            id: {
                type: Number
            },
            rate_code: {
                type: String
            },
            rate_id: {
                type: String
            },
            label: {
                type: String
            },
            compound: {
                type: Boolean
            },
            tax_total: {
                type: String
            },
            shipping_tax_total: {
                type: String
            },
        }]
    },
    shipping_lines: {
        type: [{
            id: {
                type: Number
            },
            method_title: {
                type: String
            },
            method_id: {
                type: String
            },
            total: {
                type: String
            },
            total_tax: {
                type: String
            },
            taxes: {
                type: []
            }
        }]
    },
    fee_lines: {
        type: [{
            id: {
                type: Number
            },
            name: {
                type: String
            },
            tax_class: {
                type: String
            },
            tax_status: {
                type: String
            },
            total: {
                type: String
            },
            total_tax: {
                type: String
            },
            taxes: {
                type: []
            },
            meta_data: {
                type: []
            },
        }]
    },
    coupon_lines: {
        type: [{
            id: {
                type: Number
            },
            code: {
                type: String
            },
            discount: {
                type: String
            },
            discount_tax: {
                type: String
            },
            meta_data: {
                type: []
            },
        }]
    },
    refunds: {
        type: [{
            id: {
                type: Number
            },
            reason: {
                type: String
            },
            total: {
                type: String
            },
        }]
    },
    set_paid: {
        type: Boolean
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Order", OrderSchema);