import React from 'react';
import { Toaster } from 'sonner';

const ToasterNotification = () => {
    return (
        <Toaster
            position="top-right"
            richColors
            expand={true}
            style={{
                fontFamily: '"Inter", sans-serif',
            }}
            toastOptions={{
                // General container styling
                className: `
                    !bg-white 
                    !rounded-xl 
                    !border-none 
                    !shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
                    !px-6 !py-5 
                    !min-w-[400px] 
                    !flex !items-center !gap-4 
                    !relative !overflow-hidden
                    
                    /* The thick left-side accent bar */
                    before:absolute 
                    before:left-0 
                    before:top-0 
                    before:bottom-0 
                    before:w-[12px]
                `,
                // Specific Color Mappings from the image
                successClassName: 'before:!bg-[#47D764]',
                errorClassName: 'before:!bg-[#ff355b]',
                infoClassName: 'before:!bg-[#2F86EB]',
                warningClassName: 'before:!bg-[#FFC021]',
                
                // Typography and Icon overrides
                style: {
                    border: 'none',
                },
                // Title and Description styling
                titleClassName: '!text-[#2F323D] !font-bold !text-[1.1rem] !m-0 !leading-tight',
                descriptionClassName: '!text-[#6E717E] !text-[0.95rem] !font-medium !mt-1',
                
                // Close button (the 'X')
                closeButtonClassName: '!bg-transparent !border-none !text-[#A8ABB5] hover:!text-gray-800 !top-4 !right-4 !scale-125',
            }}
            // Custom Icons to match the image precisely
            icons={{
                success: <div className="p-2 bg-[#47D764] rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>,
                error: <div className="p-2 bg-[#ff355b] rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>,
                info: <div className="p-2 bg-[#2F86EB] rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line><circle cx="12" cy="12" r="10" stroke="none" fill="transparent"></circle></svg></div>,
                warning: <div className="p-2 bg-[#FFC021] rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>,
            }}
        />
    );
};

export default ToasterNotification;