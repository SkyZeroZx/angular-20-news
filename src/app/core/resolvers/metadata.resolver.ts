import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { PageMetaData } from '../interfaces/page-title.interface';
import { Meta, Title } from '@angular/platform-browser';

export const MetaDataResolver: ResolveFn<PageMetaData> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  metaTagService = inject(Meta),
  titleService = inject(Title)
) => {
  const meta = route.data as PageMetaData;
  metaTagService.updateTag({
    property: 'description',
    content: meta.description,
  });
  titleService.setTitle(meta.title);
  return meta;
};
