function isNewer(localFileStats, remoteBatch) {
    return new Date(localFileStats.mtime) > new Date(remoteBatch.updated_at);
  }
  
  module.exports = { isNewer };
  