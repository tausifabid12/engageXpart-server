

export interface IEducation {
    userName: string
    userId: string
    courses: string[]
    courseFees: {
        course: string
        paymentDuration: number
        paymentCategory: string
        fees: string

    }[]
    brochure: {
        image: string
        course: string
    }[]
}