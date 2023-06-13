import { useState, createContext, useContext } from 'react'

// The Context
const TemplateContext = createContext()

// Template Provider
const TemplateProvider = ({ children }) => {
    const [myValue, setMyValue] = useState(0)

    // Context values passed to consumer
    const value = {
        myValue, // <------ Expose Value to Consumer
        setMyValue, // <------ Expose Setter to Consumer
    }

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    )
}

// Template Consumer
const TemplateConsumer = ({ children }) => {
    return (
        <TemplateContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        'TemplateConsumer must be used within TemplateProvider'
                    )
                }
                return children(context)
            }}
        </TemplateContext.Consumer>
    )
}

// useTemplate Hook
const useTemplate = () => {
    const context = useContext(TemplateContext)
    if (context === undefined)
        throw new Error('useTemplate must be used within TemplateProvider')
    return context
}

export { TemplateProvider, TemplateConsumer, useTemplate }
