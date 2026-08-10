import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'VideoController',
  schema: {
    videoTarget: ecs.eid,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .onEnter(() => {
        const {videoTarget} = schemaAttribute.get(eid)
        ecs.VideoControls.set(world, videoTarget, {
          loop: true,
          paused: false,
        })
      })
      .listen(eid, ecs.input.UI_CLICK, () => {
        const {videoTarget} = schemaAttribute.get(eid)

        ecs.VideoControls.mutate(world, videoTarget, (cursor) => {
          cursor.paused = !cursor.paused
          return false
        })
      })
  },
})