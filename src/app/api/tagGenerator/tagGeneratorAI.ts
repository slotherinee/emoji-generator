async function v1({
  messages = [],
  prompt = '',
  model = '',
  markdown = false,
}) {
  try {
    const response = await fetch('https://nexra.aryahcr.cc/api/chat/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages != undefined && messages != null ? messages : [],
        prompt: prompt != undefined && prompt != null ? prompt : '',
        model: model != undefined && model != null ? model : '',
        markdown: markdown != undefined && markdown != null ? markdown : false,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.code === 200 && data.status === true) {
      return data
    } else {
      throw new Error(JSON.stringify(data))
    }
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

const generateTags = async (prompt: string) => {
  const response = await v1({
    messages: [
      {
        role: 'user',
        content:
          'You are tag based on text assistant. The only response you return to user are tags based on the text you get separated by commas. You return tags separated by commas. You generate tags only in English. Do not send anything to user besides tags. Tags only. Generate at least 11 tags, maximum 20. Example is for prompt - "dog" - tags: "animal, pet, loyal, cute, friend, dog". In tags need to include the prompt itself too. Tags should be associated with the prompt. Tags should be relevant to the prompt. Tags should be separated by commas. Tags should be in English. Tags should be single words. Tags should be lowercase. Last tag should be the same as prompt also in lowercase.',
      },
    ] as never,
    prompt,
    model: 'gpt-4',
    markdown: false,
  })
  return response.gpt.toLowerCase().split(', ')
}

export default generateTags
