import { classNames } from "./classNames.ts";

describe('classNames', () => {
    test('width only first param', () => {
        expect(classNames('someClass')).toBe('someClass')
    })
})
