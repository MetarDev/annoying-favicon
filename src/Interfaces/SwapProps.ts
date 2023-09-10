export interface SwapProps {
	when: 'now' | 'onfocus' | 'onblur';
	reset?: 'none' | 'after' | 'onfocus' | 'onblur';
	resetAfterMs?: number;
}
