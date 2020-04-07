# 3DS Enryption

This server helps you encrypt your charge data collected from your customer. It encrypts the data for you and returns an object containing the encrypted payload along with your public key. This is all that is required to charge a card with Flutterwave v3.

### Run the server locally:

Install packages with

```bash
npm install

```

**Run the server with**

```bash
node server
```

Your server will be live at port **3311**

## Sample encryption

### Prerequisites

For your charge to succeed:

1. You need to be enabled for v3. Contact developers@flutterwavego.com fot this.

> encryption endpoint: localhost:3311/encrypt

### Charge payload

```json
{
  "public_key": "YOUR_PUBLIC_KEY",
  "enckey": "YOUR_ENCRYPTION_KEY",
  "card_number": "4556052704172643",
  "cvv": "899",
  "expiry_month": "01",
  "expiry_year": "21",
  "currency": "NGN",
  "country": "NG",
  "amount": "5000",
  "email": "ekene@gmail.com",
  "phone_number": "0902620185",
  "fullname": "Ekene Eze",
  "client_ip": "169.123.8.9",
  "tx_ref": "MC-3243e",
  "meta": {
    "flightID": "123949494DC"
  },
  "redirect_url": "https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c",
  "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c",
  "type": "card",
  "preauthorize": false,
  "authorization": {
    "mode": "avs_noauth",
    "pin": "3310",
    "zipcode": "07205",
    "city": "Hillside",
    "address": "470 Mundet PI",
    "state": "NJ",
    "country": "US"
  }
}
```

Send this payload to `localhost:3311/encrypt` for encryption. You will get an encrypted response like this:

```json
{
  "public_key": "FLWPUBK-348ea9a0fef6ec91be8c3d323350f7fd-X",
  "client": "nPBFZ8X7qdfzNKStBp+YuS52vUEaPif7Scd/ofZeoesEfGpRLzmtbOpZ91SXVthKGyavAs+m1wqL4DJQELx11szW9dzJfT2txs+wWBc9GJOsknhE5i42OllFvQhu0M92OHnx5NJWEQgReMNAycLY27/E/ZQLdC06a266U0SyejSd7JNSHgK9I25kkEkjiwdI/N1PBtizlr/EIrZMPFkU2sAwJsRcofeY6xQcCtIzKPwhQOznFYpUS0340Fb4ODoc+DALcfBtDk+heyr+DkSEBqCt8VptkHm3xPRlGV+JLsePhoSLg/LBPfbaHb6NbDQhNBb+nfNiIlkjMHkurqmfVVQxjIE3jPaw8cIe6XKwgwXYE7Vgh7byBCHkJPw20BD8jnLYSQ7nlkewuSe/nDskgSUVyEqovesxRLMWnCFBrcWNA3Blegal0J9DVB2gcZj8TPNUg4kTAV6203xvTOVuIyT7xYCMC7CC2MSiOGhLLADWkBTJ09RZWNnlK+nj0HE47m/EZi/R73PvLYe1xfGHtHkxJaJWhpYbhQCHJ9Mi9weSWdngKDXr6dHQ5qjHUIvamOkCUVCt6VTltdbuarC5wd35ULbIQe1e+UX2MwHt0YsdZl9lp9LWzybrM9AEaqBnSM8alRClPnzHRNBsLLJ11p3/Jvi+lGNA2z7hJUQlwmYobd8T7wILiqMQRY8Z5iN15MPFEdy1U6OFgDmiZ5uALrLZ9VsKwjlUgu8Jrgg7UcvlRJ3DIdY5Gfj7yT+CPz4FfsoASzlhoFWtFxFrsL4wiQAxIPviq1SFOXCVa5PhfWYSC+3ArMBdTpYCNe9KyZB7GwZ+wDDpibFVDKIrg7vObQHzM5sZhTRBAXf/Q0EHkK//a42lk2UD3B8gUZ9H4j7uviN2/zpTfwbVf+26bQPydXhuYzAJP+GL"
}
```

Send this response to Flutterwave's `v3/charges` endpoint to initiate a charge on the card details provided in the charge payload.

### Successful charge response

```json
{
  "status": "success",
  "message": "Charge initiated",
  "data": {
    "id": 1211241,
    "tx_ref": "MC-3243e",
    "flw_ref": "FLW-MOCK-1877391999c957432e6c14c27b860a06",
    "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c",
    "amount": 5000,
    "charged_amount": 5000,
    "app_fee": 190,
    "merchant_fee": 0,
    "processor_response": "Please enter the OTP sent to your mobile number 080****** and email te**@rave**.com",
    "auth_model": "VBVSECURECODE",
    "currency": "NGN",
    "ip": "169.123.8.9",
    "narration": "CARD Transaction ",
    "status": "success-pending-validation",
    "payment_type": "card",
    "fraud_status": "ok",
    "charge_type": "normal",
    "created_at": "2020-04-07T12:25:12.000Z",
    "account_id": 1643,
    "customer": {
      "id": 355959,
      "phone_number": "0902620185",
      "name": "Anonymous customer",
      "email": "ekene@gmail.com",
      "created_at": "2020-04-07T11:59:45.000Z"
    },
    "card": {
      "first_6digits": "455605",
      "last_4digits": "2643",
      "issuer": "VISA  CREDIT",
      "country": "GB",
      "type": "VISA",
      "expiry": "01/21"
    }
  },
  "meta": {
    "authorization": {
      "mode": "redirect",
      "redirect": "https://ravesandboxapi.flutterwave.com/mockvbvpage?ref=FLW-MOCK-1877391999c957432e6c14c27b860a06&code=00&message=Approved. Successful&receiptno=RN1586262313023"
    }
  }
}
```
