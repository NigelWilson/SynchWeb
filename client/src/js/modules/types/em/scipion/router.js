define([
    'marionette',
    'modules/types/em/scipion/controller'
], function (
    Marionette,
    c
) {
    let Router = Marionette.AppRouter.extend({
        appRoutes: {
            'em/process/scipion/visit/:visit_str': 'scipion',
        }
    });

    return new Router({
        controller: c
    })
});