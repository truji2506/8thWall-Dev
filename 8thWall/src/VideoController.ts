import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'VideoController',
  schema: {
    // @entity — referencia a la entidad que tiene el video
    videoTarget: ecs.eid,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const {videoTarget} = schemaAttribute.get(eid)

        ecs.VideoControls.mutate(world, videoTarget, (cursor) => {
          cursor.paused = !cursor.paused
          return false
        })
      })
  },
})