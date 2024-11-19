import { test, expect, request } from '@playwright/test';
// import { AUTH_TOKEN } from '../../auth';

test(`Add new order`, async ({ request }) => {
    let generated_id = (parseInt(Date.now().toString().substr(-7)).toString().length == 6) ? parseInt(Date.now().toString().substr(-7))+1000000:parseInt(Date.now().toString().substr(-7));
    const response = await request.post('/v1/orders', {
        data: {
                "order_id": generated_id,
                "scrap_yard_id": 531,
                "delivery_type": 18,
                "region_id": 1,
                "order_type": "rrr",
                "parcel_type": "D",
                "receiver": {
                    "receiver_address": {
                        "country_code": "LT",
                        "postal_code": "09124",
                        "city": "Vilnius",
                        "address_line": "Zirmunu 70-701"
                    },
                    "receiver_name": "Katerina Tkachenko",
                    "receiver_phone": "+380668675840",
                    "receiver_email": "kateryna.tkachenko@ovoko.com",
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
})        