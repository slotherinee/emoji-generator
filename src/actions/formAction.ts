'use server'

import generateTags from '@/app/api/tagGenerator/tagGeneratorAI'
import { HfInference } from '@huggingface/inference'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'
const hf = new HfInference(process.env.HF_API_KEY)

export const formAction = async (
  prevState: {
    resetKey: any
    error: string | null
    data: any
  },
  formData: FormData
) => {
  try {
    let iconDescription = formData.get('description') || ''

    if (
      !iconDescription ||
      iconDescription === '' ||
      iconDescription === undefined
    ) {
      return {
        resetKey: prevState?.resetKey,
        error: 'Description is required',
        data: null,
      }
    }
    if (iconDescription) {
      iconDescription =
        String(iconDescription)[0].toUpperCase() + iconDescription.slice(1)
    }
    const tags = await generateTags(iconDescription)

    let response
    try {
      response = await hf.textToImage(
        {
          inputs: `A TOK emoji of a ${iconDescription?.toString()}`,
          model: 'SvenN/sdxl-emoji',
          parameters: {
            negative_prompt: 'blurry',
            height: 512,
            width: 512,
          },
        },
        {
          use_cache: false,
        }
      )
    } catch (error) {
      return {
        resetKey: prevState?.resetKey,
        data: null,
        error:
          'Failed to generate emoji. Please try again later. Error might be due to the model being down.',
      }
    }
    if (response) {
      const arrayBuffer = await response.arrayBuffer()
      const blob = Buffer.from(arrayBuffer)
      const string64 = blob.toString('base64')
      const generatedResponse = await sendBlobToDB(
        string64,
        iconDescription,
        tags
      )
      if (generatedResponse.error) {
        return {
          data: null,
          resetKey: prevState?.resetKey,
          error: 'Failed to save emoji to the database',
        }
      }
      revalidatePath('/')
      return {
        resetKey: crypto.randomUUID(),
        data: generatedResponse,
        error: null,
      }
    }
  } catch (err) {
    console.log(err)
  }
}

async function sendBlobToDB(
  string64: string,
  description: string,
  tags: string[]
) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const userId = user ? user.id : null
    const response = await fetch(`${process.env.DB_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        emojiString: string64,
        description,
        tags,
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return {
      resetKey: crypto.randomUUID(),
      data: null,
      error: error,
    }
  }
}
