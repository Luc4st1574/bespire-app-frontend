const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
export async function uploadImageToBackend(formData: FormData): Promise<{ url: string }> {
    const res = await fetch(apiUrl+'/upload/image', {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error('Image upload failed');
    }
    return res.json();
  }
  