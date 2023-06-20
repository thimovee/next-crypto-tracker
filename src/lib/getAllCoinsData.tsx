export async function getAllCoinsData() {
    const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200',
        {
            method: 'GET',
            headers: {
                "X-CMC_PRO_API_KEY": process.env.API_KEY as string,
            },
            cache: 'no-cache'
        }
    );
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}