import React from 'react';

const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target={'_blank'} rel={'noopener noreferrer'}>{link.to}</a></p>
            <p>Link from: <a href={link.from} target={'_blank'} rel={'noopener noreferrer'}>{link.from}</a></p>
            <p>Click count: <strong>{link.clicks}</strong></p>
            <p>Creating data: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    );
};

export default LinkCard;