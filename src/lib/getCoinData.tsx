export async function getCoin(id: String) {
    const res = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`,
        {
            method: 'GET',
            headers: {
                "X-CMC_PRO_API_KEY": process.env.API_KEY as string,
            }
        }
    );
    return res.json();
}