import {ProfileStatus} from './ProfileStatus';
import {create} from 'react-test-renderer';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const instance = component.root;
        expect(instance.props.status).toBe('it-kamasutra.com');
    });
    test("after creating <span> should be displayed", () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const instance = component.root;
        let span = instance.findByType('span')
        expect(span).not.toBeNull();
    });
    test("after creating <input> should not be displayed", () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const instance = component.root;

        expect(() => {
            let span = instance.findByType('input')
        }).toThrow()
    });
    test("after creating <span> should contains correct status", () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const instance = component.root;
        let span = instance.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra.com');
    });
    test("<span> should be displayed in editMode instead of <span>", () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const instance = component.root;
        let span = instance.findByType('span')
        span.props.onDoubleClick()
        let input = instance.findByType('input')
        expect(input.props.value).toBe('it-kamasutra.com');
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});