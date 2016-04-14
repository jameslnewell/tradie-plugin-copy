import path from 'path';
import debug from 'debug';
import {watch, copy} from 'cpx';

const dbg = debug('tradie-plugin-copy');

/**
 * A plugin that adds live-reloading to Tradie
 * @param {tradie} tradie
 * @param {object} config
 */
export default function(tradie, config) {
  tradie.once('command.started', cmd => {

    const watching = cmd.args.watch;
    const src = config.src || tradie.config.scripts.src || tradie.config.styles.src;
    const dest = config.dest || tradie.config.scripts.dest || tradie.config.styles.dest;
    const patterns = [].concat(config.files || []);

    //TODO: move running multiple files to a core part of cpx
    let files = '';
    if (patterns.length > 1) {
      files = `{${patterns.map(file => path.join(src, file)).join(',')}}`;
    } else {
      files = patterns.map(file => path.join(src, file)).join();
    }

    switch (cmd.name) {

      case 'build':

        if (watching) {

          watch(files, dest, (err) => {
            if (err) return tradie.emit('error', err);
          })
            .on('copy', e => dbg(`Copied file "${path.relative(dest, e.dstPath)}"`))
          ;

        } else {

          copy(files, dest, (err) => {
            if (err) return tradie.emit('error', err);
          });

        }

        break;

      default:
        break;

    }

  });
};
