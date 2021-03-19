import path from 'path'
import ResolverFactory from 'enhanced-resolve/lib/ResolverFactory'
import NodeJsInputFileSystem from 'enhanced-resolve/lib/NodeJsInputFileSystem'
import CachedInputFileSystem from 'enhanced-resolve/lib/CachedInputFileSystem'


const CACHED_DURATION = 60000
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), CACHED_DURATION)

const resolver = ResolverFactory.createResolver({
  alias: {
    '@blabla': path.resolve(__dirname, 'src')
  },
  extensions: ['.scss', '.css', '.sass'],
  modules: ['src', 'node_modules'],
  useSyncFileSystemCalls: true,
  fileSystem
})

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        console.log('?????????????')
        console.log(id, basedir)
        return resolver.resolveSync({}, basedir, id)
      }
    }
  }
}
