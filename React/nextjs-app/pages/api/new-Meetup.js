export default async function handler(req, res) {

    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connet()
        const db = client.db('meetupDB')

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)
        console.log(result)
        client.close();

        res.status(200).json({message: '모임이 생성되었습니다.'})
    }

    
}