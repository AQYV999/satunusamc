export default async function handler(req: any, res: any) {
  const { type } = req.query;
  
  const donorsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2HCLiMmkNTdyczgue3C7Gh9bCHaQ3DwVbIOxuDsba3rQFg2iiCT2mKs6F5ttVlgmx13rHjMRSvhcr/pub?output=csv&gid=0';
  const votersUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2HCLiMmkNTdyczgue3C7Gh9bCHaQ3DwVbIOxuDsba3rQFg2iiCT2mKs6F5ttVlgmx13rHjMRSvhcr/pub?output=csv&gid=354557413';

  const targetUrl = type === 'donors' ? donorsUrl : votersUrl;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari Google Sheet' });
  }
}