export const setCompanyProfileLocalStorage = (company) => {
    localStorage.setItem('COMPANY_PROFILE', company)
}

export const getCompanyType = () => {
    const company = JSON.parse(localStorage.getItem('COMPANY_PROFILE'));

    return company && company.id ? company.type : false
}

