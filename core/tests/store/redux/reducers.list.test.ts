import { reduceList } from "../../../src/store/redux/reducers";

describe("Reduce list of items", () => {
  it("sets the loading status when starting", () => {
    const reduced = reduceList(
      undefined,
      {
        type: "MY_ACTION_SENT"
      },
      {
        items: [],
        itemIdentifierResolver: (item: any) => item.id,
        actionPrefix: "MY_ACTION",
        listKeyInState: "list"
      }
    );

    expect(reduced).toEqual({
      list: {
        loading: true,
        error: null
      }
    });
  });

  it("sets the error when this happens", () => {
    const reduced = reduceList(
      {
        list: {
          loading: true,
          error: null
        }
      },
      {
        type: "MY_ACTION_FAILED",
        payload: {
          message: "Invalid something..."
        }
      },
      {
        items: [],
        itemIdentifierResolver: (item: any) => item.id,
        actionPrefix: "MY_ACTION",
        listKeyInState: "list"
      }
    );

    expect(reduced).toEqual({
      list: {
        loading: false,
        error: "Invalid something..."
      }
    });
  });

  it("set the list item identifiers", () => {
    const reduced = reduceList(
      {
        list: {
          loading: true
        }
      },
      {
        type: "MY_ACTION_RECEIVED"
      },
      {
        items: [
          { id: 1, name: "Foo" },
          { id: 2, name: "Bar" }
        ],
        itemIdentifierResolver: (item: any) => item.id,
        actionPrefix: "MY_ACTION",
        listKeyInState: "list"
      }
    );

    expect(reduced).toEqual({
      list: {
        loading: false,
        identifiers: [1, 2],
        total_items: undefined,
        up_to_page: undefined
      }
    });
  });

  it("loads further pages", () => {
    const options = {
      itemIdentifierResolver: (item: any) => item.id,
      actionPrefix: "MY_ACTION",
      listKeyInState: "list",
      items: action => action.payload
    };

    let state = {};
    let state = reduceList(
      state,
      {
        type: "MY_ACTION_SENT"
      },
      options
    );

    let state = reduceList(
      state,
      {
        type: "MY_ACTION_RECEIVED",
        payload: [{ id: "1234" }],
        meta: {
          page: 1
        }
      },
      options
    );

    let state = reduceList(
      state,
      {
        type: "MY_ACTION_RECEIVED",
        payload: [{ id: "5678" }],
        meta: {
          page: 2
        }
      },
      options
    );

    expect(state).toMatchObject({
      list: expect.objectContaining({
        identifiers: ["1234", "5678"]
      })
    });
  });

  it("loads further pages in an idempotent way", () => {
    const options = {
      itemIdentifierResolver: (item: any) => item.id,
      actionPrefix: "MY_ACTION",
      listKeyInState: "list",
      items: action => action.payload
    };

    let state = {};
    let state = reduceList(
      state,
      {
        type: "MY_ACTION_SENT"
      },
      options
    );

    let state = reduceList(
      state,
      {
        type: "MY_ACTION_RECEIVED",
        payload: [{ id: "1234" }],
        meta: {
          page: 1
        }
      },
      options
    );

    const secondPageReceived = {
      type: "MY_ACTION_RECEIVED",
      payload: [{ id: "5678" }],
      meta: {
        page: 2
      }
    };

    let state = reduceList(state, secondPageReceived, options);
    let state = reduceList(state, secondPageReceived, options);

    expect(state).toMatchObject({
      list: expect.objectContaining({
        identifiers: ["1234", "5678"]
      })
    });
  });

  it("supports to specify each action", () => {
    let state = {};
    const reducerOptions = {
      items: [],
      itemIdentifierResolver: (item: any) => item.id,
      actions: {
        starting: "MY_ACTION_STARTING",
        failed: "IT_DID_FAIL",
        succeed: "YAY"
      },
      listKeyInState: "list"
    };

    state = reduceList(state, { type: "MY_ACTION_FAILED" }, reducerOptions);
    state = reduceList(
      state,
      { type: "IT_DID_FAIL", error: { oups: "Meh" } },
      reducerOptions
    );

    expect(state).toEqual({
      list: {
        loading: false,
        error: "Something went wrong."
      }
    });
  });

  it("supports a custom error message resolver", () => {
    const reduced = reduceList(
      {
        list: {
          loading: true,
          error: null
        }
      },
      {
        type: "MY_ACTION_FAILED",
        payload: {
          error: {
            myComplexErrorSchema: "With a message"
          }
        }
      },
      {
        items: [],
        itemIdentifierResolver: (item: any) => item.id,
        actionPrefix: "MY_ACTION",
        listKeyInState: "list",
        errorMessageResolver: (action: any) =>
          action.payload.error.myComplexErrorSchema
      }
    );

    expect(reduced).toEqual({
      list: {
        loading: false,
        error: "With a message"
      }
    });
  });
});
