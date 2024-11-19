import { test, expect, request } from '@playwright/test';

let generatedOrderId: number;
let scrapYardId: number;
let receiverCountryCode: string;
let receiverPostalCode: undefined;
let receiverCity: string;
let receiverAddress: string;
let receiverName: string;
let receiverPhone: undefined;
let receiveremail: undefined;

test(`Add new order`, async ({ request }) => {
    generatedOrderId = (parseInt(Date.now().toString().substr(-7)).toString().length == 6) ? parseInt(Date.now().toString().substr(-7))+1000000:parseInt(Date.now().toString().substr(-7));
    const response = await request.post('/v1/orders', {
        data: {
                "order_id": generatedOrderId,
                "scrap_yard_id": scrapYardId,
                "delivery_type": 18,
                "region_id": 1,
                "order_type": "rrr",
                "parcel_type": "D",
                "receiver": {
                    "receiver_address": {
                        "country_code": receiverCountryCode,
                        "postal_code": receiverPostalCode,
                        "city": receiverCity,
                        "address_line": receiverAddress
                    },
                    "receiver_name": receiverName,
                    "receiver_phone": receiverPhone,
                    "receiver_email": receiveremail,
                    "receiver_language_id": 2,
                    "receiver_note": "null",
                    "receiver_company_code": "null",
                    "receiver_vat_code": "null"
                },
                    "order_cost": {
                    "total_part_price_amount": 10,
                    "total_part_price_amount_without_vat": 20.36,
                    "total_shipping_price": 95,
                    "total_shipping_price_without_vat": 124.15,
                    "order_vat": 11.0,
                    "total_price_amount": 235,
                    "total_price_amount_without_vat": 235,
                    "region_part_price_amount": 50.0,
                    "region_total_price_amount": 235,
                    "region_total_shipping_price_amount": 106.23,
                    "region_payment_currency": "EUR"
                },
                "parts": [
                    {
                        "part_id": 14202,
                        "weight": 5,
                        "category_id": 112
                    }
                ],
                "item_list": [
                    14202
                ],
            }

    });
    expect(response.status()).toBe(204);
    console.log(`order_id: ${generatedOrderId}`);
});

test(`Create a shipping`, async ({ request }) => {
    const response = await request.post('/v1/providers/dpd-baltic/shippings', {
        data: {
                "planned_sending_date_and_time": "2024-11-20T17:30:00",
                "description": "TEST EE->LT",
                "delivery_notice": "Test, do not deliver",
                "order_id":  generatedOrderId,
                "scrap_yard_id": 531,
                "shipper_address": {
                    "postal_code": "47331",
                    "city": "Kaunas Kauno r.",
                    "country_code": "LT",
                    "phone": "+37068779027",
                    "company_name": "Burgija, UAB",
                    "email": "burgija2@yahoo.com",
                    "address_line": "Romainių g. 68"
                },
                "receiver_address": {
                    "postal_code": "2118",
                    "city": "Jaunsaurieši",
                    "country_code": "LV",
                    "phone": "+37129805965",
                    "full_name": "Ruslans Skubins",
                    "email": "ruslan@rrr.lt",
                    "address_line": "Kalēju iela 9"
                },
                "parcels": [
                    {
                        "measure_parameters": {
                            "weight": 50,
                            "length": 10,
                            "width": 10,
                            "height": 10
                        },
                        "description": "Skoda - Octavia (1996-2004) Octavia Mk1 (1U) 1996, 0 kW, 0 cm3"
                    }
                ]
        }
    });
    expect(response.status()).toBe(201);
})