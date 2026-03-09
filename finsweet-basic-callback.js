  window.FinsweetAttributes ||= [];
  window.FinsweetAttributes.push([
    'list',
    (listInstances) => {
      const listInstance = listInstances[0];

      listInstance.hooks.afterRender.callbacks.push(() => {
        console.log('LIST INSTANCE:', listInstance);
        const items = listInstance.renderedItems;
        console.log('RENDERED ITEMS:', items);
      });
    },
  ]);
