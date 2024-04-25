
// Possibly Deprecated

// SudokuContext.ts
import React, { createContext, useState } from 'react';

interface SudokuContextData {
    type: 'easy' | 'medium' | 'hard';
    puzzle: string;
    init: string;
}

const SudokuContext = createContext<SudokuContextData>({
    // Initial values
    type: 'easy',
    puzzle: '1',
    init: '',
});

export default SudokuContext;
