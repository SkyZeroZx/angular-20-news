export interface SwipeCoordinates {
	x: number;
	y: number;
}

export enum SwipeDirection {
	X = 'x',
	Y = 'y'
}

export interface SwipeStartEvent {
	x: number;
	y: number;
	direction: SwipeDirection;
}

export interface SwipeEvent {
	direction: SwipeDirection;
	distance: number;
}

export interface SwipeSubscriptionConfig {
  domElement: HTMLElement;
  onSwipeEnd?: (event: SwipeEvent) => void;
  onSwipeLeft?: (event: SwipeEvent) => void;
  onSwipeRight?: (event: SwipeEvent) => void;
}
