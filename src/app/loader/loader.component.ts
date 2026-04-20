import { Component, DestroyRef, DOCUMENT, inject, Renderer2 } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-loader',
	imports: [AsyncPipe],
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.scss',
})
export class LoaderComponent {

	private loaderService: LoaderService = inject(LoaderService);
	isLoader$: Observable<boolean> = this.loaderService.isLoader$;

	private renderer: Renderer2 = inject(Renderer2);
	private document: Document = inject(DOCUMENT);
	private destroyRef: DestroyRef = inject(DestroyRef);

	constructor() {
		this.isLoader$.pipe(
			tap((isLoad: boolean) => {
				if (isLoad) {
					this.blockScrolling()
				} else {
					this.unblockScrolling()
				}
			}),
			takeUntilDestroyed(this.destroyRef)
		)
		.subscribe()
	}

	blockScrolling(): void {
		this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
	}

	unblockScrolling(): void {
		this.renderer.removeStyle(this.document.body, 'overflow');
	}

}
