import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
    const [breadcrumbData, setBreadcrumbData] = useState({
        productName: null,
        blogTitle: null,
        categoryName: null
    });

    const updateBreadcrumb = (data) => {
        setBreadcrumbData(prev => ({ ...prev, ...data }));
    };

    const resetBreadcrumb = () => {
        setBreadcrumbData({
            productName: null,
            blogTitle: null,
            categoryName: null
        });
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbData, updateBreadcrumb, resetBreadcrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
    }
    return context;
};
