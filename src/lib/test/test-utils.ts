/**
 * Creates a data-testid attribute for components
 *
 * @param componentName - The name of the component
 * @param element - Optional element identifier within the component
 * @returns A string to be used as a data-testid attribute
 */
export const dataTestId = (componentName: string, element?: string): string => {
  return element ? `${componentName}-${element}` : componentName
}

/**
 * Helper function to create data-testid props for a component
 *
 * @param componentName - The name of the component
 * @param element - Optional element identifier within the component
 * @returns An object with data-testid property
 */
export const createTestProps = (componentName: string, element?: string) => ({
  'data-testid': dataTestId(componentName, element),
})
