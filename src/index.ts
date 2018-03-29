import { Ascii85, Base64, Caesar, CharcodeShift, Morse, RailFence, Substitution } from './types';

import * as _ascii85 from './cipher/ascii85';
import * as _base64 from './cipher/base64';
import * as _caesar from './cipher/caesar';
import * as _charcodeShift from './cipher/charcodeShift';
import * as _morse from './cipher/morse';
import * as _railFence from './cipher/railFence';
import * as _substitution from './cipher/substitution';

export const ascii85: Ascii85 = _ascii85;
export const base64: Base64 = _base64;
export const caesar: Caesar = _caesar;
export const charcodeShift: CharcodeShift = _charcodeShift;
export const morse: Morse = _morse;
export const railFence: RailFence = _railFence;
export const substitution: Substitution = _substitution;