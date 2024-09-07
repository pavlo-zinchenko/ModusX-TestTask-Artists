import SInfiniteScrollContainer from './styled';

export default function InfiniteScrollContainer({ children, ...props }) {
    return (
        <SInfiniteScrollContainer {...props}>
            {children}
        </SInfiniteScrollContainer>
    );
}
