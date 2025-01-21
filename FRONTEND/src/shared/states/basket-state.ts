import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddProduct, DelProduct, ResestBasket } from '../actions/product-action';
import { BasketStateModel } from './basket-state-model';
import { Injectable } from '@angular/core';

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    products: [],
  },
})
@Injectable()
export class BasketState {
  @Selector()
  static products(state: BasketStateModel) {
    return state.products;
  }

  @Selector()
  static getNbProducts(state: BasketStateModel) {
    return state.products.length;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<BasketStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: [...state.products, payload],
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<BasketStateModel>,
    { payload }: DelProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.filter((p) => p.id !== payload.id),
    });
  }

  @Action(ResestBasket)
  reset(
    { getState, patchState }: StateContext<BasketStateModel>,
    { }: ResestBasket
  ) {
    const state = getState();
    patchState({
      products: [],
    });
  }
}
