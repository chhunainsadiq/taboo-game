import isEmpty from "lodash/isEmpty"

export const formateCategories = (categories, locale) => {
  if(!isEmpty(categories)){
    const localizedCategories = categories?.[locale]
    return Object.keys(localizedCategories).map((item) => ({
        label: localizedCategories[item]?.text,
        value: item
    }))
  }
  return []
}

export const pickRandomTaboo = (currentTaboo) => {
  const tabooKeys = Object.keys(currentTaboo);
  const tabooKey = tabooKeys[Math.floor(Math.random() * tabooKeys.length)];
  return { [tabooKey]: currentTaboo[tabooKey] }
}