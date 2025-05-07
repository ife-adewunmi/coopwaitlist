export interface RegistrationBase {
  id?: string
  name: string
  email: string
  // emailIv?: string
  whatsapp: string
  // whatsappIv?: string
  gender: string
  ageBracket: string
  state: string
  city: string
  occupation: string
  registrationDate: string
}

export interface RegistrationQuestions {
  financialGoal?: string
  currentFocus?: string
  decisionValue?: string
  investmentInterest?: string[]
  riskTolerance?: string
  timeHorizon?: string
}

export interface Registration extends RegistrationBase, RegistrationQuestions {
  [key: string]: string | string[] | undefined
}
