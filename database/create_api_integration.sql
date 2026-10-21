CREATE TABLE api_integrations (
    id BIGSERIAL PRIMARY KEY,
    provider VARCHAR(50) NOT NULL UNIQUE,
    base_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    settings JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO api_integrations (
    provider,
    base_url,
    is_active,
    settings
)
VALUES (
    'nova_poshta',
    'https://api.novaposhta.ua/v2.0/json/',
    TRUE,
    '{
        "senderRef": "0321f2f8-fd18-11ec-a60f-48df37b921db",
        "contactSenderRef": "032284a3-fd18-11ec-a60f-48df37b921db",
        "sendersPhone": "380679324764",
        "citySenderRef": "db5c893b-391c-11dd-90d9-001a92567626",
        "senderWarehouseRef": "40498332-e1c2-11e3-8c4a-0050568002cf",
        "payerType": "Recipient",
        "paymentMethod": "Cash",
        "cargoType": "Parcel",
        "serviceType": "WarehouseWarehouse"
    }'::jsonb
);