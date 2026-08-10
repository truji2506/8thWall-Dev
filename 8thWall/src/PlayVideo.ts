import * as ecs from '@8thwall/ecs'


ecs.registerComponent({
  name: 'Play Video',

  schema: {
    target: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    let paused = false
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const {target} = schemaAttribute.get(eid)
        paused = !paused
        ecs.VideoControls.set(world, target, {
          // paused: !video.paused
          paused,
        })
      })
  }
})