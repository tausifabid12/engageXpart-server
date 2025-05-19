export enum LeadSource {
    FACEBOOK = "facebook",
    GOOGLE_MAP = "google_map",
    LINKEDIN = "linkedin",
}

export enum BusinessSize {
    SMALL = "small",
    MEDIUM = "medium",
    BIG = "big",
}

export enum LeadStatus {
    COLLECTED = "collected",
    MESSAGE_SENT = "message_sent",
    PHONE_CONTACT_COMPLETE = "phone_contact_complete",
    PHONE_CONTACT_FAILED = "phone_contact_failed",
    EMPLOYEE_CONTACT_COMPLETE = "employee_contact_complete",
    EMPLOYEE_CONTACT_FAILED = "employee_contact_failed",
    ON_HOLD = "on_hold",
    MEETING_SCHEDULED = "meeting_scheduled",
    MEETING_FAILED = "meeting_failed",
    NOT_INTERESTED = "not_interested",
    CONVERTED = "converted",
}

export interface IAdminLead {
    businessName: string;
    contactPersonName: string;
    email: string;
    phone: string;
    whatsapp: string;
    source: LeadSource;
    sourceUrl: string;
    businessSize: string;
    status: LeadStatus;
}
