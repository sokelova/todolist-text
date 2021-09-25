import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 32, childrenCount: 0, name: 'Yulia' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(33);
    expect(endState.childrenCount).toBe(0);
});

test('user reducer should increment only childrenCount', () => {

    const startState = { age: 32, childrenCount: 2, name: 'Yulia' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.childrenCount).toBe(2);
    expect(endState.age).toBe(33);

});

test('user reducer should change name of user', () => {
    const startState = { name: 'Yulia', age: 32, childrenCount: 0 };
    const newName = 'Mary';

    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName })

    expect(endState.name).toBe(newName);
});
