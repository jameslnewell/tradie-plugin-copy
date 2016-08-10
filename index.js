import path from 'path';
import debug from 'debug';
import {watch, copy} from 'cpx';

const dbg = debug('tradie-plugin-copy');

/**
 * A plugin that adds live-reloading to Tradie
 * @param {object} options
 */
export default (options = {}) => tradie => {
  const {files = []} = options;

  const init = cmd => {

    //only copy files when we're building
    if (cmd.name !== 'build') {
      return;
    }

    const src = tradie.config.src;
    const dest = tradie.config.dest;
    const watching = cmd.args.watch;

    //TODO: move running multiple files to a core part of cpx
    let glob = null;
    if (files.length > 1) {
      glob = `{${files.map(file => path.join(src, file)).join(',')}}`;
    } else {
      glob = files.map(file => path.join(src, file)).join();
    }

    if (watching) {

      watch(glob, dest, (err) => {
        if (err) return tradie.emit('error', err);
      })
        .on('copy', e => dbg(`Copied file "${path.relative(dest, e.dstPath)}"`))
      ;

    } else {

      copy(glob, dest, (err) => {
        if (err) return tradie.emit('error', err);
      });

    }

  };

  tradie.once('command.started', init);

};
