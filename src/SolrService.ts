import axios from 'axios';

async function addDocument() {
  const url = 'http://localhost:8983/solr/my_collection/update/json/docs';

  try {
    const document = {
      id: Math,
      title: 'Doc 1',
    };

    const response = await axios.post(url, document, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Document added successfully:', response?.data);
  } catch (error:any) {
    console.error('Error adding document:', error?.message);
  }
}

addDocument();
