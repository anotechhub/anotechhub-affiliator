import React from 'react';
import InputForm from './InputForm';
import OutputSection from './OutputSection';

const GeneratorPage = (props) => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        <InputForm {...props} />
        <OutputSection {...props} />
    </div>
);

export default GeneratorPage;