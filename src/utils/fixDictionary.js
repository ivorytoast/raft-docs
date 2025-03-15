import { useState, useEffect } from 'react'

// Helper function to parse the FIX dictionary
function parseFIXDictionary(xmlDoc) {
  const dictionary = {
    header: {},
    trailer: {},
    messages: {},
    fields: {},
    components: {},
    // Store the original XML elements for group lookups
    headerElement: xmlDoc.querySelector('header'),
    trailerElement: xmlDoc.querySelector('trailer'),
    messagesElement: xmlDoc.querySelector('messages')
  }

  // Parse components
  const components = xmlDoc.querySelectorAll('component')
  components.forEach(component => {
    const name = component.getAttribute('name')
    dictionary.components[name] = {
      fields: {},
      required: component.getAttribute('required') === 'Y',
      element: component // Store the element for querying fields later
    }

    component.querySelectorAll('field').forEach(field => {
      dictionary.components[name].fields[field.getAttribute('name')] = {
        required: field.getAttribute('required') === 'Y'
      }
    })
  })

  // Parse header fields
  const headerFields = xmlDoc.querySelector('header').querySelectorAll('field')
  headerFields.forEach(field => {
    dictionary.header[field.getAttribute('name')] = {
      required: field.getAttribute('required') === 'Y'
    }
  })

  // Parse trailer fields
  const trailerFields = xmlDoc.querySelector('trailer').querySelectorAll('field')
  trailerFields.forEach(field => {
    dictionary.trailer[field.getAttribute('name')] = {
      required: field.getAttribute('required') === 'Y'
    }
  })

  // Parse messages
  const messages = xmlDoc.querySelectorAll('messages > message')
  messages.forEach(message => {
    const msgType = message.getAttribute('msgtype')
    dictionary.messages[msgType] = {
      name: message.getAttribute('name'),
      category: message.getAttribute('msgcat'),
      fields: {},
      // Store the original message element for group lookups
      element: message
    }

    message.querySelectorAll('field').forEach(field => {
      dictionary.messages[msgType].fields[field.getAttribute('name')] = {
        required: field.getAttribute('required') === 'Y'
      }
    })
  })

  // Parse fields
  const fields = xmlDoc.querySelectorAll('fields > field')
  fields.forEach(field => {
    dictionary.fields[field.getAttribute('number')] = {
      name: field.getAttribute('name'),
      type: field.getAttribute('type')
    }
  })

  return dictionary
}

// Custom hook to load and parse the FIX dictionary
export function useFIXDictionary() {
  const [dictionary, setDictionary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/src/utils/fixDictionary.xml')
      .then(response => response.text())
      .then(xmlText => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        const parsedDictionary = parseFIXDictionary(xmlDoc)
        setDictionary(parsedDictionary)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { dictionary, loading, error }
} 